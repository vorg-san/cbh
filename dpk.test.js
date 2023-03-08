const { deterministicPartitionKey } = require("./dpk")

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe("0")
  })
	
  it("When there is an input without partitionKey", () => {
    const trivialKey = deterministicPartitionKey({name:'Daniel'})
    expect(trivialKey).toBe("c0a197f903b82c9af612cded4ab52ee674d9c7374fb1ba32453f0d2621329fe33a1c4ec92ecdcdb6add1400239d3010f8afd0f5fb488f67e9b92ee2fa258594f")
  })
	
  it("When there is an input with a small string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:'Daniel'})
    expect(trivialKey).toBe("Daniel")
  })
	
  it("When there is an input with a big (308 length) string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, ZA, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z'})
    expect(trivialKey).toBe("6a11851df60eaac56952b3fb626ad8677c8ac45e595404757caf62b9ce7602b0ae51cca47ea845fa2afa50fdbfad9197843818343828183667b6974a89198725")
  })
	
  it("When there is an input with a small non string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:{key:'Daniel'}})
    expect(trivialKey).toBe(JSON.stringify({key:'Daniel'}))
  })
	
  it("When there is an input with a big (318 length) non string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:{key:'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, ZA, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z'}})
    expect(trivialKey).toBe("6fbe63483a885e931af21edbadeee19e10db2b5b8eacb8bfe1aa915f5f9f993303da8012c6e8019e4f021e879f337be364d9a715ca3a8a7fc9d77144a3cceb8e")
  })
})
