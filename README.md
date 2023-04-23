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
quicklog.writeInfo('this is a super info log') 
quicklog.writeWarning('this is a super warning log') 
quicklog.writeInfo('this is a super error log') 
```
