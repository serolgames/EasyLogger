# EasyLogger

#### easylogger is a lightweight package to log info, warning and error in an dedicated file.

# How to use : 

#### import :

```javascript
const EasyLogger = require('EasyLogger')('logfile.txt', true);//with syntaxic coloration
const EasyLogger = require('EasyLogger')('logfile.txt', false);//without syntaxic coloration
```

#### Method :

```javascript
ErrorLog.writeInfo('this is a super info log') 
ErrorLog.writeWarning('this is a super warning log') 
ErrorLog.writeInfo('this is a super error log') 
```
