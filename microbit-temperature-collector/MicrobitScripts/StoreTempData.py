"""
@author Jashanjot Singh Pruthi
@resources
1 Max-min temperature logger - https://microbit.org/projects/make-it-code-it/maxmin-temperature-logger/
2 Local Persistent File System - https://microbit-micropython.readthedocs.io/en/v1.0.1/filesystem.html
"""
from microbit import *
import machine

name = "file"
"""
This script will be flashed to the microbit and used to write temperature data to our file 
"""


def get_data():
    """
    Reads from the string file contaiing temperature values seperated by comma inside microbit and converts it into a list of temperature values
    :return: A list of all temperature values stored in file
    """
    recordsLst = []
    try:
        with open(name) as file:
            strData = file.read()
            x = strData.split(',')
            for a in x:
                recordsLst.append(a)
    except OSError:
        return []
    return recordsLst


def set_data(recordsList):
    """
    used to replace the temperature values in the old file with the temperature values in the recordsList
    :param recordsList: list of temperature readings stored as strings
    :return: None
    """
    try:
        with open(name, 'wt') as f:
            for record in recordsList:
                f.write(str(record) + ',')
    except OSError:
        display.scroll('Cannot write to file %s' % name)


def main():
    """
    The main heart of the program that is run in an infinite while loop.
    Used to record temperature and storing temperature values in a file inside microbit storage
    :return: None
    """
    if accelerometer.was_gesture('shake'):
        display.scroll(temperature())  # displays current temperature on microbit screen when shaked
    if button_a.was_pressed():
        lst = get_data()
        for temp in lst:
            uart.write(str(temp) + '\r\n')  # sends temperature readings to computer's serial port
    if button_b.was_pressed():
        display.scroll("Recording Started")
        while True:
            if running_time() % 86400000 == 0:  # After every 24 hours, record the temperature
                lst = get_data()
                lst.append(str(temperature()))
                set_data(lst)
            if button_a.was_pressed():  # If button a is pressed on the microbit
                lst = get_data()        # sends temperature readings to computer's serial port
                for temp in lst:
                    uart.write(str(temp) + '\r\n')
            if accelerometer.was_gesture('shake'):
                display.scroll(temperature())  # displays current temperature on microbit screen when shaked


while True:
    main()
