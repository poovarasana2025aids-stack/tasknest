package com.tasknest.repository;

import com.tasknest.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByDueDate(LocalDate dueDate);

    List<Task> findByDueDateBeforeAndCompletedFalse(
            LocalDate date
    );
}