const xlsx=require('xlsx');
const Income=require("../models/Income");



//code segment to add income source
exports.addIncome=async (req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,source,amount,date}=req.body;
        //Checking for any empty fields
        if(!source || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newIncome=new Income({
                userId,
                icon,
                source,
                amount,
                date:new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }catch (error){
        res.status(500).json({message:"Server Error"});
    }
}
//getting all incomes
exports.getAllIncome=async (req,res)=>{
    const userId=req.user.id;

    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.status(200).json(income);
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:"Server Error"});
    }
}
//delete em 
exports.deleteIncome=async (req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"});
    }catch (error){
        res.status(500).json({message:"Server Error"});
    }
};
//download excel
exports.downloadIncomeExcel=async (req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        //prepare data fro excel
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date.toISOString().split("T")[0],
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx');
    }catch (error){
        console.error("Error",error);
        res.status(500).json({message:"Server Error"});
    }
};