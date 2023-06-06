import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()
