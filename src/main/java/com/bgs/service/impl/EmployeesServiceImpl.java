package com.bgs.service.Impl;

import com.bgs.mapper.EmployeesMapper;
import com.bgs.pojo.UserPaper;
import com.bgs.service.EmployeesService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
public class EmployeesServiceImpl implements EmployeesService {

    @Resource
    EmployeesMapper employeesMapper;

    @Override
    public List<UserPaper> userpapeInfo(String startTime,String endTime) {

        return employeesMapper.userpapeInfo(startTime,endTime);
    }

}
