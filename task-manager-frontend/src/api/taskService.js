/**
 * Task Service - Unified Interface
 * Automatically switches between API and localStorage based on guest mode
 * Provides a single interface so components don't need to know the implementation
 */

import api from '../plugins/axios';
import { guestTaskService } from './guestTaskService';

/**
 * Check if user is in guest mode
 * @returns {boolean}
 */
const isGuestMode = () => {
  return localStorage.getItem('isGuest') === 'true';
};

/**
 * Get all tasks
 * @returns {Promise<Array>} Array of task objects
 */
export const getTasks = async () => {
  if (isGuestMode()) {
    // Return guest tasks (wrapped in Promise for consistency)
    return Promise.resolve(guestTaskService.getTasks());
  }
  
  try {
    const { data } = await api.get('/tasks');
    // Backend returns { message, data: [...] }
    return data.data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Add a new task
 * @param {Object} taskData - Task data (title, description)
 * @returns {Promise<Object>} Created task object
 */
export const addTask = async (taskData) => {
  if (isGuestMode()) {
    // Return guest task (wrapped in Promise for consistency)
    return Promise.resolve(guestTaskService.addTask(taskData));
  }
  
  try {
    const { data } = await api.post('/tasks', {
      title: taskData.title,
      description: taskData.description,
    });
    // Backend returns { message, data: task }
    return data.data || data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

/**
 * Update a task
 * @param {number} taskId - Task ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated task object
 */
export const updateTask = async (taskId, updates) => {
  if (isGuestMode()) {
    // Return updated guest task (wrapped in Promise for consistency)
    return Promise.resolve(guestTaskService.updateTask(taskId, updates));
  }
  
  try {
    // Backend requires title to be present, fetch current task to get missing fields
    const tasksResponse = await api.get('/tasks');
    const allTasks = tasksResponse.data.data || [];
    const currentTask = allTasks.find(t => t.id === taskId);
    
    if (!currentTask) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    
    // Merge current task with updates to ensure all required fields are present
    const mergedData = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
      ...updates
    };
    
    const { data } = await api.put(`/tasks/${taskId}`, mergedData);
    // Backend returns { message, data: task }
    return data.data || data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Delete a task
 * @param {number} taskId - Task ID to delete
 * @returns {Promise<boolean>} True if successful
 */
export const deleteTask = async (taskId) => {
  if (isGuestMode()) {
    // Return deletion result (wrapped in Promise for consistency)
    return Promise.resolve(guestTaskService.deleteTask(taskId));
  }
  
  try {
    await api.delete(`/tasks/${taskId}`);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Clear all tasks (for guest users only)
 * @returns {Promise<boolean>}
 */
export const clearAllTasks = async () => {
  if (isGuestMode()) {
    return Promise.resolve(guestTaskService.clearAllTasks());
  }
  
  // For authenticated users, this would require backend implementation
  console.warn('clearAllTasks is only supported in guest mode');
  return Promise.resolve(false);
};
