package com.automationrhapsody.observability.services;

import com.automationrhapsody.observability.repositories.person.FlightRepository;
import com.automationrhapsody.observability.repositories.person.Person;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.extension.annotations.WithSpan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PersonService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);

    @Autowired
    private FlightRepository flightRepository;

    public Iterable<Person> getPersons() {
        doSomeWorkNewSpan();
        return flightRepository.findAll();
    }

    @WithSpan
    public void doSomeWorkNewSpan() {
        LOGGER.info("Doing some work In New span");
        Span span = Span.current();

        span.setAttribute("template.a2", "some value");

        span.addEvent("template.processing2.start", attributes("321"));
        span.addEvent("template.processing2.end", attributes("321"));
    }

    private Attributes attributes(String id) {
        return Attributes.of(AttributeKey.stringKey("app.id"), id);
    }
}
