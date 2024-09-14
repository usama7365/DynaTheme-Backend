const Style = require('../models/style');

exports.saveStyle = async (req, res) => {
    try {
        const { userId, component, styles } = req.body;
        const existingStyle = await Style.findOne({ userId, component });

        if (existingStyle) {
            existingStyle.styles = styles;
            await existingStyle.save();
        } else {
            const newStyle = new Style({ userId, component, styles });
            await newStyle.save();
        }

        res.status(200).json({ message: 'Style saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save style.' });
    }
};

// Retrieve styles for live website
exports.getStyle = async (req, res) => {
    try {
        const { userId } = req.params;
        const styles = await Style.find({ userId });
        res.status(200).json(styles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve styles.' });
    }
};
