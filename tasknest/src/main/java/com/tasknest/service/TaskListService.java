package com.tasknest.service;

import com.tasknest.entity.TaskList;
import com.tasknest.entity.User;
import com.tasknest.repository.TaskListRepository;
import com.tasknest.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final UserRepository userRepository;

    public TaskListService(TaskListRepository taskListRepository,
                           UserRepository userRepository) {
        this.taskListRepository = taskListRepository;
        this.userRepository = userRepository;
    }

    // Create task list
    public TaskList createTaskList(Long userId, String name) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TaskList taskList = new TaskList();
        taskList.setName(name);
        taskList.setUser(user);

        return taskListRepository.save(taskList);
    }

    // Get all task lists
    public List<TaskList> getAllTaskLists() {
        return taskListRepository.findAll();
    }

    // Get task list by ID
    public TaskList getTaskListById(Long id) {
        return taskListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task list not found"));
    }

    // Delete task list
    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }
}