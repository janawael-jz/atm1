app.get("/api/v1/courses/:id",(req,res)=>{
const courseID=+req.params.id;
const course = courses.find((c) => c.id === courseID)
if (!course){
    return res.status(404).json({
        status : "error",
        message : "course not found",
    });
}
res.status(200).json({
    status : "success",
    data : {
        course,
    },
});
});