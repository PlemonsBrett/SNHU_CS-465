/**
 * User model representing a user in the application
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User service for handling user-related operations
 */
export class UserService {
  private users: User[] = [];

  /**
   * Get all users
   * @returns Array of users
   */
  getAllUsers(): User[] {
    return this.users;
  }

  /**
   * Get a user by ID
   * @param id User ID
   * @returns User if found, undefined otherwise
   */
  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Create a new user
   * @param userData User data without ID and timestamps
   * @returns The created user
   */
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const now = new Date();
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Update a user
   * @param id User ID
   * @param userData User data to update
   * @returns Updated user if found, undefined otherwise
   */
  updateUser(
    id: string,
    userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return undefined;
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * Delete a user
   * @param id User ID
   * @returns True if user was deleted, false otherwise
   */
  deleteUser(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length !== initialLength;
  }
}
