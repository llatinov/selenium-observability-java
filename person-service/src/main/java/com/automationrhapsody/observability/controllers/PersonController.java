package com.automationrhapsody.observability.controllers;

import com.automationrhapsody.observability.repositories.person.Person;
import com.automationrhapsody.observability.services.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class PersonController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonController.class);

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping("/persons")
    public List<Person> persons() {
        LOGGER.info("Processing GET /persons request.");

        Iterable<Person> persons = personService.getPersons();
        return StreamSupport.stream(persons.spliterator(), false).collect(Collectors.toList());
    }
}
