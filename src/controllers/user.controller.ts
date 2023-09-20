import express, { Request, Response } from 'express';
import randomString from 'randomstring';
import { UserModel } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  let {
    body: { companyName, email },
  } = req;
  const userExists = await UserModel.findOne({ $or: [{ email, companyName }] });
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const payload = {
    companyName,
    email,
    apiKey: randomString.generate(7),
  };
  const user = await UserModel.create(payload);
  return res.status(201).json(user);
};
