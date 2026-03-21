const tf = require("@tensorflow/tfjs")

const trainModel = async (data) => {

    if (!data.length) return null

    const xs = tf.tensor2d(

        data.map(w => [w.userIndex, w.movieIndex])
    )

    const ys = tf.tensor2d(

        data.map(w => [w.rating])
    )

    const model = tf.sequential()

    model.add(tf.layers.dense({

        units: 16,
        inputShape: [2],
        activation: "relu"
    }))

    model.add(tf.layers.dense({

        units: 8,
        activation: "relu"
    }))

    model.add(tf.layers.dense({

        units: 1
    }))

    model.compile({

        optimizer: "adam",
        loss: "meanSquaredError"
    })

    await model.fit(xs, ys, {

        epochs: 30,
        loss: "meanSquaredError"
    })

    await model.fit(xs, ys, {

        epochs: 30,
        verbose: 0
    })

    return model
}

module.exports = { trainModel }

