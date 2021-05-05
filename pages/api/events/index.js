// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {events} = require('./data.json')

export default (req, res) => {
  if (req.method ==='GET'){
    return  res.status(200).json(events)
  }else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `${req.method} is not allowed`})
  }


}
