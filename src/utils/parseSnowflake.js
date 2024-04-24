module.exports = snowflake => {
    // https://discord.com/developers/docs/reference#convert-snowflake-to-datetime and help from Victor🥰
    const binary = Number(snowflake).toString(2).padStart(64, 0);

    const timestampBinary = binary.slice(0, 42); // The green part
    const internalWorkerIdBinary = binary.slice(42, 47); // The purple part
    const internalProcessIdBinary = binary.slice(47, 52); // The pink part
    const incrementBinary = binary.slice(52, 64); // The red part

    const timestampDecimal = parseInt(timestampBinary, 2);
    const timestampEpoch = timestampDecimal + 1420070400000;
    const timestamp = new Date(timestampEpoch);

    const internalWorkerId = parseInt(internalWorkerIdBinary, 2);

    const internalProcessId = parseInt(internalProcessIdBinary, 2);

    const increment = parseInt(incrementBinary, 2);

    return {
        binary,

        timestampBinary,
        internalWorkerIdBinary,
        internalProcessIdBinary,
        incrementBinary,

        timestampDecimal,
        timestampEpoch,
        timestamp,

        internalWorkerId,

        internalProcessId,

        increment
    }
}