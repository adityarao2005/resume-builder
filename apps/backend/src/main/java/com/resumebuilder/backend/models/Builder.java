package com.resumebuilder.backend.models;

import java.lang.reflect.InvocationTargetException;

public interface Builder<T> {
    T build();

    public static <T, F extends Builder<T>> F create(Class<F> builderClass) {
        try {
            return builderClass.getConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException
                | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }
}
