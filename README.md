# QuickFilelog

#### easylogger is a lightweight package to log info, warning and error in an dedicated file.

# How to use : 

#### import :

with syntaxic coloration :
```javascript
const quicklog = require('quickfilelog')('logfile.txt', true);
```
without syntaxic coloration :
```javascript
const quicklog = require('quickfilelog')('logfile.txt', false);
```

#### Methods :

```javascript
quicklog.writeInfo('this is a super info log')//write a info type
quicklog.writeWarning('this is a super warning log')//write a warning type
quicklog.writeInfo('this is a super error log')//write an error type 
quicklog.erase()//flush your log file content
```

## Example of use :

```javascript
const logger = require("quickfilelog")("mylog.txt", true)

logger.writeInfo('this is a super info log')//write a info type
logger.writeWarning('this is a super warning log')//write a warning type
logger.writeInfo('this is a super error log')//write an error type 
```

#### Will output in the file mylog.txt :

23/04/23 23h17m56s [INFO] this is a super info log <br>
23/04/23 23h18m18s [WARNING] this is a super warning log<br>
23/04/23 23h18m18s [ERROR] this is a super error log

