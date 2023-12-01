Docker images
[redis/redis-stack for DEV/TST or](https://hub.docker.com/r/redis/redis-stack) 
[redis/redis-stack-server for PRD](https://hub.docker.com/r/redis/redis-stack-server)


# Redis
## `.set(key, value)`
Sets a key-value pair. Anything we set in redis will be of type `string` by default
## `.get(key)`
Gets a value for the provided key
## `.del(key)`
Deletes key
## `.exists(key)`
Return if a key exists
## `.keys()`
Returns all the keys in the database
## `.flushall()`
Deletes all the keys in the database

## Expirations
### `setex`
is for setting a key with an expiration
### `.ttl`
is for getting an expiration 

## Lists
### `.lpush`
Pushes an element to the start of an array of name key  
### `.rpush`
Pushes an element to the end of an array of name key 
### `.lrange` 
Is for printing out array elements from index to index. If 0 to -1 provided, will print out all array elements
### `lpop` and `rpop`
deletes side appropriate elements and returns it

## Sets is array of unique elements
### `.SADD`
pushes an value to a key set
### `.SMEMBERS`
prints out all values
### `.SREM`

## Hashes key-value pairs


