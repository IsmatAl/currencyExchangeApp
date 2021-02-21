const { json } = require('body-parser');
const express = require('express');
const Diagram = require('../../models/diagram');

const getDiagram = async (req, res, next) => {
  try {
    let diagram = await Diagram.find({});
    if (diagram.length > 0) {
      return res.status(200).json({
        'message': 'diagram fetched successfully',
        'data': diagram
      });
    }

    return res.status(404).json({
      'code': 'BAD_REQUEST_ERROR',
      'description': 'No diagram found in the system'
    });
  } catch (error) {
    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
}

const createDiagram = async (req, res, next) => {
  const jsonString = JSON.stringify(req.body);
  try {
    let newJsonStr = await Diagram.create({ jsonString });
    if (newJsonStr) {
      return res.status(201).json({
        'message': 'Diagram added successfully',
        'data': newJsonStr
      });
    } else {
      throw new Error('something went worng');
    }
  } catch (error) {
    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
}

module.exports = {
  getDiagram: getDiagram,
  createDiagram: createDiagram
}