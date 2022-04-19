

const validateToken = (token) => {
    let  key  = token;
    const validate = jwt.verify(key, process.env.PRIVATE_KEY, (err, decoded) => {
        err
			? res.status(401).send({
					error: "401 Unauthorized User",
					message: err.message,
			  })
			  : res.status(200).send({
					message: "200 OK",
			  });
    })
	return validate;
}
