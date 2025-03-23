import pool from "./database";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";


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
    const hashedPassword = await bcrypt.encodeBase64(senha, 10);
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, cpf, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};