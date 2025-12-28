
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

const complaintsCollection = collection(db, 'complaints');

export const createComplaint = async (complaintData) => {
  try {
    const docRef = await addDoc(complaintsCollection, {
      ...complaintData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    console.log('✅ Complaint created with ID:', docRef.id);
    return { id: docRef.id, ...complaintData, createdAt: new Date().toISOString() };
  } catch (error) {
    console.error('❌ Error creating complaint:', error);
    throw error;
  }
};

export const getComplaints = async (userId = null) => {
  try {
    let q;
    
    if (userId) {
      console.log('🔍 Fetching complaints for user:', userId);
      q = query(
        complaintsCollection, 
        where('userId', '==', userId)
      );
    } else {
      console.log('🔍 Fetching all complaints');
      q = query(complaintsCollection);
    }
    
    const querySnapshot = await getDocs(q);
    const complaints = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString()
      };
    });
    
    console.log(`✅ Found ${complaints.length} complaints`);
    return complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('❌ Error fetching complaints:', error);
    throw error;
  }
};

export const updateComplaintStatus = async (complaintId, newStatus) => {
  try {
    const complaintRef = doc(db, 'complaints', complaintId);
    await updateDoc(complaintRef, {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
    console.log('✅ Complaint status updated');
  } catch (error) {
    console.error('❌ Error updating complaint:', error);
    throw error;
  }
};
