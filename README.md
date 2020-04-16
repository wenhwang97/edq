# CSE416 Project: Election Data Quality

## Introduction
Coming soon...

## How to Use

### Preparation
This guild is specifically for IntelliJ IDEA. Preparation using other IDE may be differnet
1. Install maven
2. Install all dependencies using maven
3. Mark directory `src/main/java` as "sources root"
4. Mark directory `src/main/resources` as "resources root"
5. Mark directory `src/test/java` as "test sources root"
### Run
Use the ```public static void main(String[] args)``` method in `src/main/java/com/u1s1/edq/EdqApplication.java` to run.

## Documentation
## Issues
- Only ```StateController``` has been partially implemented. It can only send a hard-coded ```State``` entity to the client in JSON format.
- Method ```public void receiveState(State state)``` is a testing method. It can receive ```State``` entity from the client and print the information in the console.

