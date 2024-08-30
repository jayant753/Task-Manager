import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';
dotenv.config();
const app = express();
// Middleware setup
app.use(cors());
app.use(express.json());
// User routes
app.use('/users', userRoutes);
// Task routes
app.use('/tasks', taskRoutes);
// Error handling middleware
app.use(errorHandler);
// Sync the database and start the server
const PORT = process.env.PORT || 8000;
sequelize.sync({ force: false })
    .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to sync the database:', error.message);
});
//# sourceMappingURL=index.js.map