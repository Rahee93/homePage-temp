"""
@author Jashanjot Singh Pruthi
@modified Team Codeck
@resources
1 Max-min temperature logger - https://microbit.org/projects/make-it-code-it/maxmin-temperature-logger/
2 Local Persistent File System - https://microbit-micropython.readthedocs.io/en/v1.0.1/filesystem.html
"""
from microbit import *
from os import remove
name = "file"
"""
This script will be flashed to the microbit and used to write temperature data to our file 
"""


def get_data():
    """
    Reads from the string file contaiing temperature values seperated by comma inside microbit and converts it into a list of temperature values
    :return: A list of all temperature values stored in file
    """
    try:
        with open(name) as file:
            strData = file.read()
            return strData.split(',')
    except OSError:
        return []


def set_data(recordsList):
    """
    used to replace the temperature values in the old file with the temperature values in the recordsList
    :param recordsList: list of temperature readings stored as strings
    :return: None
    """
    try:
        with open(name, 'wt') as f:
            f.write(','.join(recordsList))
    except OSError:
        display.scroll('Cannot write to file %s' % name)
        
def record_temperature():
    lst = get_data()
    lst.append(str(temperature()))
    set_data(lst)

recording = False
last_record_time = 0
interval = 86400000 # 24 hours
def main():
    """
    The main heart of the program that is run in an infinite while loop.
    Used to record temperature and storing temperature values in a file inside microbit storage
    :return: None
    """
    global last_record_time
    global recording
    if accelerometer.was_gesture('shake'):
        display.scroll(temperature())  # displays current temperature on microbit screen when shaked
    if button_a.was_pressed():
        recording = False
        lst = get_data()
        if len(lst) == 0:
            display.scroll('NO DATA')
        else:
            display.scroll('SENDING')
            for temp in lst:
                uart.write(str(temp) + '\r\n')  # sends temperature readings to computer's serial port
            # send -1 means no more data
            uart.write('-1')
            display.scroll('<<<<<<<<<<<<<')    
    if button_b.was_pressed():
        if recording:
            display.scroll("IN RECORDING")
        else:
            # before recording, remove the old file
            try:
                remove(name)
            except OSError:
                pass
            display.scroll("RECORDING STARTED")
            recording = True
            record_temperature()
            last_record_time = running_time()
    if recording and running_time() >= last_record_time + interval:
        record_temperature()
        last_record_time = running_time()

display.show(Image.HAPPY)
while True:
   main()
