import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';

// Define a TaskAttributes interface for type safety
interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  userId: number;
}

// Optional fields for task creation
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public dueDate!: Date;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Task model
Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

// Establish the relationship with the User model
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Task;
