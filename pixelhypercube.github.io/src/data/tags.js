const iconsDir = "./assets/img/icons/";
let tags = {
    "Python":{
        "type":"Programming",
        "icon_path":iconsDir+"python.svg"
    },
    "C++":{
        "type":"Programming",
        "icon_path":iconsDir+"cpp.svg"
    },
    "C":{
        "type":"Programming",
        "icon_path":iconsDir+"c.svg"
    },
    "C#":{
        "type":"Programming",
        "icon_path":iconsDir+"cs.svg"
    },
    "HTML":{
        "type":"Web Dev",
        "icon_path":iconsDir+"html.svg"
    },
    "CSS":{
        "type":"Web Dev",
        "icon_path":iconsDir+"css.svg"
    },
    "Javascript":{
        "type":"Programming",
        "icon_path":iconsDir+"js.svg"
    },
    "Typescript":{
        "type":"Programming",
        "icon_path":iconsDir+"ts.svg"
    },
    "Java":{
        "type":"Programming",
        "icon_path":iconsDir+"java.svg"
    },
    "VBA":{
        "type":"Programming",
        "icon_path":iconsDir+"vba.svg"
    },
    "EJS":{
        "type":"Web Dev",
        "icon_path":iconsDir+"ejs.svg"
    },
    "React.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"reactjs.svg"
    },
    "Next.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"nextjs.svg"
    },
    "Node.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"nodejs.svg"
    },
    "Postman":{
        "type":"Web Dev",
        "icon_path":iconsDir+"postman.svg"
    },
    "SQL":{
        "type":"Databases",
        "icon_path":iconsDir+"sql.svg"
    },
    "MongoDB":{
        "type":"Databases",
        "icon_path":iconsDir+"mongodb.svg"
    },
    "Git":{
        "type":"DevOps",
        "icon_path":iconsDir+"git.svg"
    },
    "Github":{
        "type":"DevOps",
        "icon_path":iconsDir+"github.svg"
    },
    "Heroku":{
        "type":"DevOps",
        "icon_path":iconsDir+"heroku.svg"
    },
    "Figma":{
        "type":"Design",
        "icon_path":iconsDir+"figma.svg"
    },
    "Canva":{
        "type":"Design",
        "icon_path":iconsDir+"canva.svg"
    },
    "MS Office Suite":{
        "type":"Programs",
        "icon_path":iconsDir+"msoffice.svg"
    },
    "VMWare Workstation Pro":{
        "type":"Programs",
        "icon_path":iconsDir+"vmware.svg"
    },
    "Android Studio":{
        "type":"Programs",
        "icon_path":iconsDir+"androidstudio.svg"
    },
    "Pygame":{
        "type":"Game Dev",
        "icon_path":iconsDir+"pygame.svg"
    },
};
let tagKeys = Array.from(new Set(Object.keys(tags).map(item=>tags[item]["type"])));

let tabsObj = {tags,tagKeys};
export default tabsObj;