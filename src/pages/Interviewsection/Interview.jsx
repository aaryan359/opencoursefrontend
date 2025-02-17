import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Editor from "../../Components/Text-editor/Quill";

const Interview = () => {
  const [experiences, setExperiences] = useState([]);
  const { sighnupData } = useSelector((state) => state.auth);
  const [editorContent, setEditorContent] = useState("");
  const [editor, setEditor] = useState(false); 
  const { token: token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    skill: "",
    Domain: "",
    ExperienceLevel: "",
    difficulty: "",
    questiontype: "",
    questions: "",
    answers: "",
    postedBy: sighnupData ? sighnupData._id : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQuestions = async () => {
    try {
      const dataToSend = { ...formData, answers: editorContent };
      await axios.post(
        "https://opencoursebackend.onrender.com/Interview/addQuestion",

        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Question added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Error fetching questions:", err);
      toast.error("Failed to add question. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, answers: editorContent };
    setExperiences([...experiences, updatedFormData]);

    await addQuestions();
    setFormData({
      companyName: "",
      role: "",
      skill: "",
      Domain: "",
      ExperienceLevel: "",
      difficulty: "",
      questiontype: "",
      questions: "",
      answers: "",
    });
    setEditorContent("");
  };

  const toggleEditor = () => {
    setEditor(!editor); // Toggle editor visibility
  };

  return (
		<div className="bg-bg-dark min-h-screen p-4">
			{!token ? (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
					<h2 className="text-xl text-white text-center p-4  rounded-lg">
						To contribute, please login or
						sign up first
					</h2>
				</div>
			) : (
				<div className="container w-[80%] mx-auto p-4 sm:p-6">
					<h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white text-center">
						Interview Experience Submission
					</h1>

					<form
						onSubmit={handleSubmit}
						className="border-2 border-purple-500 p-4 sm:p-8 rounded-xl grid grid-cols-1 gap-6">
						{/* Left Column */}
						<div>
							{/* Company Name */}
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="companyName"
									id="companyName"
									placeholder=" "
									value={
										formData.companyName
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								/>
								<label
									htmlFor="companyName"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-blue-400 peer-focus:scale-75 peer-focus:-translate-y-6">
									Company
									Name
									(optional)
								</label>
							</div>

							{/* Job Role */}
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="role"
									id="role"
									placeholder=" "
									value={
										formData.role
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								/>
								<label
									htmlFor="role"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Job Role
									(optional)
								</label>
							</div>

							{/* Skill */}
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="skill"
									id="skill"
									placeholder=" "
									value={
										formData.skill
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required
								/>
								<label
									htmlFor="skill"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Technology/Skill
									(mandatory)
								</label>
							</div>

							{/* Domain */}
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="Domain"
									id="Domain"
									placeholder=" "
									value={
										formData.Domain
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								/>
								<label
									htmlFor="Domain"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Industry/Domain
									(optional)
								</label>
							</div>

							{/* Experience Level */}
							<div className="relative z-0 w-full mb-6 group">
								<select
									name="ExperienceLevel"
									id="ExperienceLevel"
									value={
										formData.ExperienceLevel
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required>
									<option value="">
										Select...
									</option>
									<option value="fresher">
										Fresher
									</option>
									<option value="1-5">
										1-3
										years
										of
										Experience
									</option>
									<option value="5+">
										5+
										years
										of
										Experience
									</option>
								</select>
								<label
									htmlFor="ExperienceLevel"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-blue-400 peer-focus:scale-75 peer-focus:-translate-y-6">
									Experience
									Level
									(mandatory)
								</label>
							</div>
						</div>

						{/* Right Column */}
						<div>
							{/* Difficulty */}
							<div className="relative z-0 w-full mb-6 group">
								<select
									name="difficulty"
									id="difficulty"
									value={
										formData.difficulty
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required>
									<option value="">
										Select...
									</option>
									<option value="easy">
										Easy
									</option>
									<option value="medium">
										Medium
									</option>
									<option value="hard">
										Hard
									</option>
								</select>
								<label
									htmlFor="difficulty"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Difficulty
									Level
									(mandatory)
								</label>
							</div>

							{/* Question Type */}
							<div className="relative z-0 w-full mb-6 group">
								<select
									name="questiontype"
									id="questiontype"
									value={
										formData.questiontype
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required>
									<option value="">
										Select...
									</option>
									<option value="hr">
										HR
									</option>
									<option value="system design">
										System
										Design
									</option>
									<option value="case study">
										Case
										Study
									</option>
									<option value="technical">
										Technical
									</option>
									<option value="behavioral">
										Behavioral
									</option>
								</select>
								<label
									htmlFor="questiontype"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Question
									Type
									(mandatory)
								</label>
							</div>

							{/* Interview Questions */}
							<div className="relative z-0 w-full mb-6 group">
								<textarea
									name="questions"
									id="questions"
									value={
										formData.questions
									}
									onChange={
										handleChange
									}
									className="block py-2 sm:py-4 px-0 w-full text-base sm:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									rows="2"
									required
								/>
								<label
									htmlFor="questions"
									className="peer-focus:font-medium absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
									Interview
									Questions
								</label>
							</div>
						</div>

						{/* Your Answers */}
						<div className="relative z-0 w-full mb-6 group">
							<label
								htmlFor="answers"
								className="peer-focus:font-medium  absolute text-sm sm:text-lg text-gray-50 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 sm:top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
								Your Answers
							</label>

							<button
								type="button"
								onClick={
									toggleEditor
								}
								className="bg-blue-500  text-white mt-6 px-4  rounded">
								{editor
									? "Close Editor"
									: "Open Editor"}
							</button>

							{editor && (
								<div className="mt-4">
									<Editor
										value={
											editorContent
										}
										onChange={
											setEditorContent
										}
									/>
								</div>
							)}
						</div>

						<button
							type="submit"
							className="bg-purple-500 text-white py-2 px-4 rounded mt-4">
							Submit Experience
						</button>
					</form>
				</div>
			)}
		</div>
  );
};

export default Interview;
