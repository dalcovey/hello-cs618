import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'
import jwt from 'jsonwebtoken'
export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}
export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  console.log('Fetched user:', user) // Log the fetched user
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  console.log('Password match:', isPasswordCorrect) // Log the password comparison result
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  console.log('Generated token:', token) // Log the generated token
  return token
}
