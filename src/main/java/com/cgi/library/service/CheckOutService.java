package com.cgi.library.service;

import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.repository.CheckOutRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CheckOutService {

    @Autowired
    private CheckOutRepository checkOutRepository;

    public Page<CheckOutDTO> getCheckOuts(Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return checkOutRepository.findAll(pageable).map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }

    public CheckOutDTO getCheckOut(UUID checkOutId) {
        CheckOut checkOut = checkOutRepository.getOne(checkOutId);
        return ModelMapperFactory.getMapper().map(checkOut, CheckOutDTO.class);
    }

    public void saveCheckOut(CheckOutDTO checkOutDTO) {
        checkOutRepository.save(ModelMapperFactory.getMapper().map(checkOutDTO, CheckOut.class));
    }

    public void updateCheckOut(UUID checkOutId, CheckOutDTO checkOutDTO) {
        CheckOut existingCheckOut = checkOutRepository.getOne(checkOutId);
        if (existingCheckOut != null) {
            // Update the existing checkout entity with the data from the DTO
            ModelMapper modelMapper = ModelMapperFactory.getMapper();
            modelMapper.map(checkOutDTO, existingCheckOut);

            // Save the updated checkout entity to the database
            checkOutRepository.save(existingCheckOut);
        } else {
            // Handle the case where the checkout does not exist
            throw new RuntimeException("Checkout not found with ID: " + checkOutId);
        }
    }

    public void deleteCheckOut(UUID checkOutId) {
        checkOutRepository.deleteById(checkOutId);
    }
}
