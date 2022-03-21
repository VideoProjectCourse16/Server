import { Movie } from './models/movies.model';

export const formatCollection = <T=any>(collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>)  => {
    const data: (T & {id: string})[] = collection.docs.map((doc) => {
        return {id: doc.id,...doc.data() as T};
    });
    return data;
}
