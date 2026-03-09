const iconsDir = "./assets/img/icons/";
let tags = {
    "Python":{
        "type":"Programming",
        "icon_path":iconsDir+"python.svg",
        "proficiency": "Proficient",
    },
    "C++":{
        "type":"Programming",
        "icon_path":iconsDir+"cpp.svg",
        "proficiency": "Familiar"
    },
    "C":{
        "type":"Programming",
        "icon_path":iconsDir+"c.svg",
        "proficiency": "Familiar"
    },
    "C#":{
        "type":"Programming",
        "icon_path":iconsDir+"cs.svg",
        "proficiency": "Familiar"
    },
    "HTML":{
        "type":"Web Dev",
        "icon_path":iconsDir+"html.svg",
        "proficiency": "Proficient"
    },
    "CSS":{
        "type":"Web Dev",
        "icon_path":iconsDir+"css.svg",
        "proficiency": "Proficient"
    },
    "Javascript":{
        "type":"Programming",
        "icon_path":iconsDir+"js.svg",
        "proficiency": "Proficient",
    },
    "Typescript":{
        "type":"Programming",
        "icon_path":iconsDir+"ts.svg",
        "proficiency": "Familiar"
    },
    "Java":{
        "type":"Programming",
        "icon_path":iconsDir+"java.svg",
        "proficiency": "Familiar"
    },
    "VBA":{
        "type":"Programming",
        "icon_path":iconsDir+"vba.svg",
        "proficiency": "Familiar"
    },
    "EJS":{
        "type":"Web Dev",
        "icon_path":iconsDir+"ejs.svg",
        "proficiency": "Proficient"
    },
    "React.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"reactjs.svg",
        "proficiency": "Familiar"
    },
    "Next.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"nextjs.svg",
        "proficiency": "Familiar"
    },
    "Node.js":{
        "type":"Web Dev",
        "icon_path":iconsDir+"nodejs.svg",
        "proficiency": "Familiar"
    },
    "Postman":{
        "type":"Web Dev",
        "icon_path":iconsDir+"postman.svg",
        "proficiency": "Proficient"
    },
    "SQL":{
        "type":"Databases",
        "icon_path":iconsDir+"sql.svg",
        "proficiency": "Proficient",
    },
    "MongoDB":{
        "type":"Databases",
        "icon_path":iconsDir+"mongodb.svg",
        "proficiency": "Familiar"
    },
    "Git":{
        "type":"DevOps",
        "icon_path":iconsDir+"git.svg",
        "proficiency": "Familiar"
    },
    "Github":{
        "type":"DevOps",
        "icon_path":iconsDir+"github.svg",
        "proficiency": "Familiar"
    },
    "Heroku":{
        "type":"DevOps",
        "icon_path":iconsDir+"heroku.svg",
        "proficiency": "Familiar"
    },
    "Figma":{
        "type":"Design",
        "icon_path":iconsDir+"figma.svg",
        "proficiency": "Proficient"
    },
    "Canva":{
        "type":"Design",
        "icon_path":iconsDir+"canva.svg",
        "proficiency": "Proficient"
    },
    "VMWare Workstation Pro":{
        "type":"Programs",
        "icon_path":iconsDir+"vmware.svg",
        "proficiency": "Familiar"
    },
    "Android Studio":{
        "type":"Programs",
        "icon_path":iconsDir+"androidstudio.svg",
        "proficiency": "Familiar"
    },
    "Pygame":{
        "type":"Game Dev",
        "icon_path":iconsDir+"pygame.svg",
        "proficiency": "Familiar"
    },
};
let tagKeys = Array.from(
    new Set(
        Object.keys(tags)
        .map(item=>tags[item]["type"])
    )
);

let tabsObj = {tags,tagKeys};
export default tabsObj;