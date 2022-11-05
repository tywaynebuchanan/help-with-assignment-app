exports.LoginPage = ((req,res)=>{
    res.status(200).render('pages/index');
})

exports.Dashboard = ((req,res)=>{
    res.render('pages/dashboard');
})

exports.Preferences = ((req,res)=>{
    res.render('pages/settings');
})

exports.Payments = ((req,res)=>{
    res.render('pages/payments');
})

exports.Child = ((req,res)=>{
    res.render('pages/child-info');
})