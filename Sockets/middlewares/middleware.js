const emitir = (req, res, next, io) => {
  const notificar = req.query.notificacao || '';
  if (notificar !== '') {
    io.emit('notificacao', notificar);
  }
  next();
};

module.exports = {
  emitir,
};
