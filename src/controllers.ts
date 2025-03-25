import { APIGatewayProxyHandler } from 'aws-lambda';
import * as bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';
import * as jwt from "jsonwebtoken";
import pool from "./database";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const healthCheck: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};



export const login: APIGatewayProxyHandler = async (event) => {
  try {
    const { cpf , senha } = JSON.parse(event.body);

    const result = await pool.query("SELECT * FROM usuarios WHERE cpf = $1 ",
          [cpf]
         );

    if (result.rows.length === 0 ) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Usuário não encontrado" }),
      };
    }

    const isMatch = await bcrypt.compare(senha, result.rows[0].senha);
    
    if (!isMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Credenciais inválidas" }),
      }
    }

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: "1h" });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao fazer login", error: error.message }),
    }
  }
};

