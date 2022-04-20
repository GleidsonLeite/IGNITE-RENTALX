import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user
  const usersRepository = new UsersRepository()
  const foundUser = await usersRepository.findById(id)

  if (!foundUser) {
    throw new AppError("User does not exists!", 401)
  }

  if (!foundUser.isAdmin) {
    throw new AppError("User is not an admin!", 403)
  }
  return next()
}