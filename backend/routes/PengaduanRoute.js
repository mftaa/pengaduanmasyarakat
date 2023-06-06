import express from "express";
import {
    getPengaduans,
    getPengaduanById,
    createPengaduan,
    updatePengaduan,
    deletePengaduan
} from "../controllers/Pengaduans.js";
import { verifyUser,adminOnly,officerOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/pengaduans',verifyUser, getPengaduans);
router.get('/pengaduans/:id',verifyUser, getPengaduanById);
router.post('/pengaduans',verifyUser, createPengaduan);
router.patch('/pengaduans/:id',verifyUser, updatePengaduan);
router.delete('/pengaduans/:id',verifyUser, deletePengaduan);

export default router;