const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/baby-age', function (req, res) {
  res.render('baby-age')
})

router.post('/baby-age', function (req, res) {
  const answer = req.session.data['baby-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-age': 'Select how old your baby is.' }
    return res.render('baby-age')
  }
  if (answer === 'over-2-years') {
    return res.redirect('/ineligible-baby-age')
  }
  res.redirect('/first-time-parent')
})

router.get('/ineligible-baby-age', function (req, res) {
  res.render('ineligible-baby-age')
})

router.get('/first-time-parent', function (req, res) {
  res.render('first-time-parent')
})

router.post('/first-time-parent', function (req, res) {
  const answer = req.session.data['first-time-parent']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'first-time-parent': 'Select yes if you are a first-time parent.' }
    return res.render('first-time-parent')
  }
  res.redirect('/household-income')
})

router.get('/household-income', function (req, res) {
  res.render('household-income')
})

router.post('/household-income', function (req, res) {
  const answer = req.session.data['household-income']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'household-income': 'Select yes if your household income is less than £25,000 per year.' }
    return res.render('household-income')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-household-income')
  }
  res.redirect('/parent-name')
})

router.get('/ineligible-household-income', function (req, res) {
  res.render('ineligible-household-income')
})

router.get('/parent-name', function (req, res) {
  res.render('parent-name')
})

router.post('/parent-name', function (req, res) {
  const answer = req.session.data['parent-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'parent-name': 'Enter your full name.' }
    return res.render('parent-name')
  }
  res.redirect('/national-insurance')
})

router.get('/national-insurance', function (req, res) {
  res.render('national-insurance')
})

router.post('/national-insurance', function (req, res) {
  const answer = req.session.data['national-insurance']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'national-insurance': 'Enter your National Insurance number.' }
    return res.render('national-insurance')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('TOY')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
