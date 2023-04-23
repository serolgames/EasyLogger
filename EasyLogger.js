const fs = require('fs');
const Semaphore = require('semaphore');
const colors = require('colors');

class EasyLogger 
{
    static semaphore = null;

    constructor(filepath, coloration) 
    {
        this.filepath = filepath === '' ? 'easylogger.txt' : filepath;
        this.coloration = coloration

        if(EasyLogger.semaphore === null) 
            EasyLogger.semaphore = Semaphore(1);
    }

    #write(type, data) 
    {
        let line = `${this.#getDate()} ${type} ${data}\n`;

        if(this.coloration)
        {
            switch(type)
            {
                case "[INFO]":
                    line = colors.white(line)
                    break;
                case "[WARNING]":
                    line = colors.yellow(line)
                    break;
                case "[ERROR]":
                    line = colors.red(line);
                    break;
                default:
                    line = colors.white(line)
                    break; 
            }
        }
      
        EasyLogger.semaphore.take(() => {
          fs.appendFile(this.filepath, line, (err) => {
            /*if (err) 
              console.error("Une erreur est survenue lors de l'écriture du fichier : ", err);
            else 
              console.log('Le fichier a été écrit avec succès.');*/
            EasyLogger.semaphore.leave();
          });
        });
    }
      
    writeInfo(data) 
    {
        this.#write(EasyLogger.INFO, data);
    }
    
    writeWarning(data) 
    {
        this.#write(EasyLogger.WARNING, data);
    }
    
    writeError(data)
    {
        this.#write(EasyLogger.ERROR, data);
    }

    erase() 
    {
        EasyLogger.semaphore.take(() => {
            fs.truncate(this.filepath, 0, (err) => {
                /*if (err) 
                    console.error('Erreur lors de la suppression du contenu du fichier : ', err);
                else 
                    console.log('Le contenu du fichier a été supprimé avec succès.');*/
                
                EasyLogger.semaphore.leave();
            });
        });
    }

    #getDate() 
    {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString().substring(2);
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${day}/${month}/${year} ${hours}h${minutes}m${seconds}s`;
        return formattedDate;
    }
}

EasyLogger.INFO = '[INFO]';
EasyLogger.WARNING = '[WARNING]';
EasyLogger.ERROR = '[ERROR]';

module.exports = function(filepath, coloration) {
    return new EasyLogger(filepath, coloration);
};
