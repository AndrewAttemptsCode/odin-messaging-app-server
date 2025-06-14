const getChat = (req, res) => {
  const { sender, receiver } = req.params;
  const { id } = req.user;

  if (id !== Number(sender) && id !== Number(receiver)) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.json({ msg: "Success", sender, receiver });
}

module.exports = { getChat };