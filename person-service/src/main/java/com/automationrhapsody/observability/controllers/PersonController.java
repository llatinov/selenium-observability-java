package com.automationrhapsody.observability.controllers;

import com.automationrhapsody.observability.services.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonController.class);

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(value = "/persons", method = RequestMethod.GET)
    public List<PersonDto> getPersons() {
        LOGGER.info("Processing GET /persons request.");

        List<PersonDto> persons = personService.getPersons();
        return persons;
    }

    @RequestMapping(value = "/persons", method = RequestMethod.POST)
    public Long savePersons(@RequestBody PersonDto person) {
        LOGGER.info("Processing POST /persons request with {}", person);

        Long resultId = personService.savePerson(person);
        return resultId;
    }
}
