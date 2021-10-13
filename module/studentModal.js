const mongoose = require("mongoose");

const studentSchema = {
	name: String,
	stuClass: String,
	subjects: {
		english: String,
		urdu: String,
		math: String,
	},
};

module.exports.studentModal = new mongoose.model("students", studentSchema);

// module.exports = {
// 	studentModal: studentModal,
// };

// module.exports.addAppliedJobDetailsInDB = (appliedJobDetails) => {
// 	return new Promise((resolve, reject) => {
// 		const appliedJobInstance = new todoModal(appliedJobDetails);

// 		appliedJobInstance.save((err, addedAppliedJobDetails) => {
// 			if (err) {
// 				console.log("Unable to add applied job details in DB");
// 				return reject(err);
// 			}
// 			resolve(addedAppliedJobDetails);
// 		});
// 	});
// };

// module.exports.getListOfAppliedJobByQuery = (query) => {
// 	return new Promise((resolve, reject) => {
// 		appliedJobDetailsModel.find(query, (err, jobsFound) => {
// 			if (err) {
// 				console.log("Unable to Find jobs list of this user ");
// 				return reject(err);
// 			}
// 			resolve(jobsFound);
// 		});
// 	});
// };

// module.exports.deleteAppliedUserByJobId = (query) => {
// 	return new Promise((resolve, reject) => {
// 		appliedJobDetailsModel.deleteMany(query, (err, userDeleted) => {
// 			if (err) {
// 				console.log("Unable to delete from database");
// 				reject(err);
// 			}
// 			resolve(userDeleted);
// 		});
// 	});
// };
