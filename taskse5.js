class Members{
    constructor(name, email, id) {
        this.name = name;
        this.#email = email;
        this.#id = id;
    }
    set id(id){ if(id.length>3){
        this.#id=id
    }else{
        console.log("invalid id")
    }
            }
    set email(email){ if(email.includes("@")){
        this.#email= email
    }else{
        console.log("invalid email")
    }
          
    }
    get email(){
        return this.#email
    }
    get id(){
        return this.#id
    }
    describe(){
        console.log('name: ${this.name}, email: ${this.email}, id: ${this.id}')
    }
}
class Person extends Members{
    constructor(name, email, id) {
        super(name, email, id);
        this.studentid = studentid;
        this.teacherid = teacherid;
    }
    addmember(){
        this.member.push(member)
        console.log('${member.name} added')

    }
    removemember(){
        this.member=this.member.filter(member => member.name !== member.name)
        console.log('${member.name} removed')
    }
listmembers(){
    this.member.foreach(member => {
        console.log('name:${member.name},email:${member.email}')
    })
}
}
class teacher extends person{
    constructor(name,email,id,subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades=[]
    }
grades(studentname, grade) {
        this.grades.push({ studentname, grade });
        console.log('grade ${grade}added for ${studentname}')
    }
    listgrades(){
        this.grades.forEach(grade => {
            console.log('student: ${grade.studentname}, grade: ${grade.grade}')
        })
    }
    describe(){
        console.log('name: ${this.name}, email: ${this.email}, id: ${this.id}, subject: ${this.subject}')
    }
}   
class student extends person{
    constructor(name, email, id) {
        super(name, email, id);
        this.subject = [];
    }
    enrollsubject(subject){
        this.subject.push(subject)
        console.log('${this.name}enrolled in ${subject}')
    }
    viewsubjects(){
        this.subject.forEach(subject => {
            console.log('subject: ${subject}')
        })
       
    }

}
const person = new person("ali","ali@example.com","123")
const teacher =new teacher("jana","jana@example.com","456","Math")
const student = new student("ahmed","ahmed@example.com","789")
person.addmember(teacher)
person.addmember(student)
teacher.grades("ahmed", 85)
student.enrollsubject("Math")
student.viewsubjects()
teacher.listgrades()
person.listmembers()
const schoolmembers =[person ,teacher,student]
console.log("n\scholmembers:")
schoolmembers.forEach(member => {
    member.describe()
})
