const fs = require('fs');
const Semaphore = require('semaphore');
const colors = require('colors');

class QuickLogger 
{
    static semaphore = null;

    constructor(filepath, coloration) 
    {
        this.filepath = filepath === '' ? 'QuickLogger.txt' : filepath;
        this.coloration = coloration

        if(QuickLogger.semaphore === null) 
            QuickLogger.semaphore = Semaphore(1);
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
      
        QuickLogger.semaphore.take(() => {
          fs.appendFile(this.filepath, line, (err) => {
            /*if (err) 
              console.error("Une erreur est survenue lors de l'écriture du fichier : ", err);
            else 
              console.log('Le fichier a été écrit avec succès.');*/
            QuickLogger.semaphore.leave();
          });
        });
    }
      
    writeInfo(data) 
    {
        this.#write(QuickLogger.INFO, data);
    }
    
    writeWarning(data) 
    {
        this.#write(QuickLogger.WARNING, data);
    }
    
    writeError(data)
    {
        this.#write(QuickLogger.ERROR, data);
    }

    erase() 
    {
        QuickLogger.semaphore.take(() => {
            fs.truncate(this.filepath, 0, (err) => {
                /*if (err) 
                    console.error('Erreur lors de la suppression du contenu du fichier : ', err);
                else 
                    console.log('Le contenu du fichier a été supprimé avec succès.');*/
                
                QuickLogger.semaphore.leave();
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

QuickLogger.INFO = '[INFO]';
QuickLogger.WARNING = '[WARNING]';
QuickLogger.ERROR = '[ERROR]';

module.exports = function(filepath, coloration) {
    return new QuickLogger(filepath, coloration);
};
