const crypto = require("crypto")

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0"
  const MAX_PARTITION_KEY_LENGTH = 256

	const cryptoHash = crypto.createHash("sha3-512")
  
	let candidate = event  
		? event.partitionKey || cryptoHash.update(JSON.stringify(event)).digest("hex") 
		: TRIVIAL_PARTITION_KEY

	if (typeof candidate !== "string") 
		candidate = JSON.stringify(candidate)
	
	if (candidate.length > MAX_PARTITION_KEY_LENGTH) 
		candidate = cryptoHash.update(candidate).digest("hex")
	
	return candidate;
}