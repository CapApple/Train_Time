1. When entering the first train time, the time needs to be in military format. eg.     1600 (4:00 pm)
2. Firebase and moment.js are used for this train schedule.
3. When calculating the next arrival time and time till next train, three              situatinos were taken into consideration:
    a. current time is between the running window of the day;
    b. current time is before the window;
    c. current time is after the window; 