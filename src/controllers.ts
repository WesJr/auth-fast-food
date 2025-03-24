import pool from "./database";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';
import * as jwt from "jsonwebtoken";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Teste de conexão
export const testDB = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Banco conectado!", time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, cpf, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, cpf, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { cpf , senha } = req.body;

    const result = await pool.query("SELECT * FROM usuarios WHERE cpf = $1 ",
          [cpf]
         );
    console.log(JWT_SECRET)

    if (result.rows.length === 0 ) {res.status(400).json({ message: "Usuário não encontrado" });}

    const isMatch = await bcrypt.compare(senha, result.rows[0].senha);
    
    if (!isMatch) {res.status(400).json({ message: "Credenciais inválidas" });}

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: "1h" });


    res.json("Bearer: " + token);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

