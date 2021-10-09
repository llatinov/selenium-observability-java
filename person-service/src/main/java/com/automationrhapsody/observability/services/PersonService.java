package com.automationrhapsody.observability.services;

import com.automationrhapsody.observability.controllers.PersonDto;
import com.automationrhapsody.observability.repositories.person.FlightRepository;
import com.automationrhapsody.observability.repositories.person.PersonEntity;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Context;
import io.opentelemetry.extension.annotations.WithSpan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PersonService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);

    @Autowired
    private FlightRepository flightRepository;

    public List<PersonDto> getPersons() {
        doSomeWorkNewParentSpan();
        doSomeWorkNewChildSpan();
        doNothing();
        Iterable<PersonEntity> persons = flightRepository.findAll();
        return StreamSupport.stream(persons.spliterator(), false)
                .map(this::toPersonDto)
                .collect(Collectors.toList());
    }

    public Long savePerson(PersonDto person) {
        PersonEntity personEntity = toPersonEntity(person);
        PersonEntity result = flightRepository.save(personEntity);
        return result.getId();
    }

    @WithSpan
    public void doSomeWorkNewChildSpan() {
        LOGGER.info("Doing some work In New child span");
        Span span = Span.current();
        span.setAttribute("template.a2", "some value");
        span.addEvent("template.processing2.start", attributes("321"));
        span.addEvent("template.processing2.end", attributes("321"));
    }

    @WithSpan
    public void doNothing() {
    }

    @WithSpan
    public void doSomeWorkNewParentSpan() {
        LOGGER.info("Doing some work In New parent span");
        Span span = Span.fromContext(Context.current());
        span.end();
        doSomeWorkNewChildSpan();
    }

    private Attributes attributes(String id) {
        return Attributes.of(AttributeKey.stringKey("app.id"), id);
    }

    private PersonDto toPersonDto(PersonEntity person) {
        PersonDto personDto = new PersonDto();
        personDto.setFirstName(person.getFirstName());
        personDto.setLastName(person.getLastName());
        personDto.setEmail(person.getEmail());
        return personDto;
    }

    private PersonEntity toPersonEntity(PersonDto person) {
        PersonEntity personEntity = new PersonEntity();
        personEntity.setFirstName(person.getFirstName());
        personEntity.setLastName(person.getLastName());
        personEntity.setEmail(person.getEmail());
        return personEntity;
    }
}
