/**
 * Guest Task Service
 * Manages tasks for guest users using localStorage
 * Provides the same interface as the API so the UI doesn't need to change
 */

const GUEST_TASKS_KEY = 'guestTasks';

/**
 * Get all guest tasks from localStorage
 * @returns {Array} Array of task objects
 */
const getTasks = () => {
  try {
    const tasks = localStorage.getItem(GUEST_TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error reading guest tasks from localStorage:', error);
    return [];
  }
};

/**
 * Add a new task for guest user
 * @param {Object} taskData - Task data (title, description)
 * @returns {Object} Created task with id, status, timestamps
 */
const addTask = (taskData) => {
  try {
    const tasks = getTasks();
    
    // Create new task with same structure as API
    const newTask = {
      id: Date.now(), // Simple ID generation
      title: taskData.title,
      description: taskData.description || '',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    tasks.push(newTask);
    localStorage.setItem(GUEST_TASKS_KEY, JSON.stringify(tasks));
    
    return newTask;
  } catch (error) {
    console.error('Error adding guest task:', error);
    throw error;
  }
};

/**
 * Update an existing guest task
 * @param {number} taskId - Task ID to update
 * @param {Object} updates - Fields to update (title, description, status)
 * @returns {Object} Updated task object
 */
const updateTask = (taskId, updates) => {
  try {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    
    // Update task fields while preserving structure
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      id: tasks[taskIndex].id, // Preserve original ID
      created_at: tasks[taskIndex].created_at, // Preserve creation date
      updated_at: new Date().toISOString(), // Update timestamp
    };
    
    tasks[taskIndex] = updatedTask;
    localStorage.setItem(GUEST_TASKS_KEY, JSON.stringify(tasks));
    
    return updatedTask;
  } catch (error) {
    console.error('Error updating guest task:', error);
    throw error;
  }
};

/**
 * Delete a guest task
 * @param {number} taskId - Task ID to delete
 * @returns {boolean} True if deletion was successful
 */
const deleteTask = (taskId) => {
  try {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    
    if (filteredTasks.length === tasks.length) {
      console.warn(`Task with id ${taskId} not found for deletion`);
    }
    
    localStorage.setItem(GUEST_TASKS_KEY, JSON.stringify(filteredTasks));
    return true;
  } catch (error) {
    console.error('Error deleting guest task:', error);
    throw error;
  }
};

/**
 * Clear all guest tasks
 * @returns {boolean} True if clear was successful
 */
const clearAllTasks = () => {
  try {
    localStorage.removeItem(GUEST_TASKS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing guest tasks:', error);
    throw error;
  }
};

// Export service object with all methods
export const guestTaskService = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  clearAllTasks,
};
