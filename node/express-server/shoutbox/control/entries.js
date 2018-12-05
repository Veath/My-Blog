const Entry = require('../lib/entry');
exports.list = (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        console.log(entries);
        res.render('entries', {
            title: 'Entries',
            entries,
        })
    });
};
exports.form = (req, res) => {
    res.render('post', {
        title: 'Post'
    })
}

exports.submit = (req, res, next) => {
    const data = req.body;
    const entry = new Entry({
        username: res.locals.user.name,
        title: data.title,
        body: data.body
    });
    entry.save((err) => {
        if (err) return next(err);
        if (req.authUser) {
            res.json({message: 'Entry added.'})
        } else {
            res.redirect('/');
        }
    })
}